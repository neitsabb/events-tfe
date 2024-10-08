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
    protected $subpanels = []; // Ajoutez cette ligne pour gérer les sous-panels

    public function handlePanel($id = null, $panel = 'default', $subpanel = null)
    {
        if (!in_array($panel, $this->panels)) {
            abort(404);
        }

        if ($panel === 'settings' && $subpanel) {
            if (!in_array($subpanel, $this->subpanels)) {
                abort(404);
            }
            $view = $this->viewPath . 'Settings/' . ucfirst($subpanel) . '/View';
        } else {
            $view = $this->viewPath . ucfirst($panel) . '/View';
        }

        $isOrganization = $this->model === Organization::class;

        // Si l'entité est un event, on utilise la méthode withTrashed pour récupérer les événements archivés
        $entity = $isOrganization
            ? $this->model::findOrFail(Session::get('selected_organization')->id)
            : $this->model::withTrashed()->findOrFail($id);

        if ($panel === 'settings' && Gate::inspect('settings', $entity)->denied()) {
            Redirect::back()->with('error', 'Vous n\'avez pas les droits pour accéder à cette page.');
        }

        if (Gate::inspect('view', $entity)->allowed()) {
            $modelName = strtolower(class_basename($this->model));

            return Inertia::render(
                $view,
                [
                    $modelName => new $this->resource($entity),
                ]
            );
        }

        return Redirect::route('dashboard');
    }
}
