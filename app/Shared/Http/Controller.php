<?php

namespace App\Shared\Http;

use App\Organization\Shared\Models\Organization;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

abstract class Controller
{
    protected $panels;
    protected $model;
    protected $viewPath;
    protected $resource;
    protected $subpanels = [];
    protected $cachedEntity = null;

    public function handlePanel($id = null, $panel = 'default', $subpanel = null, $data = [])
    {
        if (!in_array($panel, $this->panels)) {
            abort(404);
        }

        $view = $panel === 'settings' && $subpanel
            ? $this->getSubpanelView($panel, $subpanel)
            : $this->viewPath . ucfirst($panel) . '/View';

        $isOrganization = $this->model === Organization::class;

        $entity = $this->getEntity($id, $isOrganization, ['transactions.tickets', 'tickets.transactions']);

        $settingsAccess = Gate::inspect('settings', $entity);
        $viewAccess = Gate::inspect('view', $entity);

        if ($panel === 'general' && $settingsAccess->denied()) {
            abort(403);
        }

        if ($viewAccess->allowed()) {
            $modelName = strtolower(class_basename($this->model));

            return Inertia::render(
                $view,
                [
                    $modelName => new $this->resource($entity),
                    ...$data,
                ]
            );
        }

        return Redirect::route('dashboard');
    }

    protected function getEntity($id, $isOrganization, $relations = [])
    {
        if ($this->cachedEntity) {
            return $this->cachedEntity;
        }

        $this->cachedEntity = $isOrganization
            ? $this->model::findOrFail(Session::get('selected_organization')->id)
            : $this->model::withTrashed()->with($relations)->findOrFail($id);

        return $this->cachedEntity;
    }

    protected function getSubpanelView($panel, $subpanel)
    {
        if (!in_array($subpanel, $this->subpanels)) {
            abort(404);
        }
        return $this->viewPath . 'Settings/' . ucfirst($subpanel) . '/View';
    }
}
