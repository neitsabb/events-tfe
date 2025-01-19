import React from 'react';
import { Button } from '../ui/button';

export const Input = ({
    type,
    value,
    placeholder,
    onChange,
    required = false,
    options = [],
}: {
    type: string;
    value: string | File | Date | null;
    placeholder: string;
    onChange: (value: any) => void;
    required?: boolean;
    options?: {
        name: string;
        value: string;
    }[];
}) => {
    if (type === 'file') {
        return (
            <div className="flex flex-col gap-1 w-full">
                <label className="block text-sm font-medium text-gray-700 font-integral">
                    {placeholder}
                    {required && (
                        <span className="text-red-500 ml-1 text-xs font-mono">
                            *
                        </span>
                    )}
                </label>
                <div className="flex items-center justify-center w-full">
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-36 border border-gray-200 border-dashed  cursor-pointer bg-gray-100 font-integral"
                    >
                        {!value ? (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                    className="w-8 h-8 mb-4 text-gray-400 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>

                                <p className="text-xs text-gray-400 dark:text-gray-400">
                                    WEBP, SVG, PNG, JPG ou JPEG. Max 2Mo
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <img
                                    src={
                                        value instanceof File
                                            ? URL.createObjectURL(value)
                                            : value
                                    }
                                    alt="logo"
                                    className="w-20 h-20 rounded-full border"
                                />
                                <Button
                                    onClick={() => onChange('')}
                                    className="mt-2 !px-4 !py-1"
                                    variant={'customer_yellow'}
                                >
                                    Modifier
                                </Button>
                            </div>
                        )}
                        <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            accept="image/jpeg,image/png,image/jpg,image/gif,image/svg,image/webp"
                            onChange={(e) => {
                                onChange(e.target.files[0]);
                            }}
                        />
                    </label>
                </div>
            </div>
        );
    }

    if (type === 'select') {
        return (
            <div className="flex flex-col gap-1 w-full">
                <label className="block text-sm font-medium text-gray-700 font-integral">
                    {placeholder}
                    {required && (
                        <span className="text-red-500 ml-1 text-xs font-mono">
                            *
                        </span>
                    )}
                </label>
                <select
                    value={value as string}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-gray-100 px-1 py-2 outline-none border focus:ring-offset-2 focus:ring-2 focus:ring-primary text-gray-400"
                >
                    {/* <option value="" disabled>
                        {placeholder}
                    </option> */}
                    {options.map((option) => (
                        // Add selected attribute
                        <option
                            key={option.value}
                            value={option.value}
                            selected={option.value === value}
                        >
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    if (type === 'textarea') {
        return (
            <div className="flex flex-col gap-1 w-full">
                <label className="block text-sm font-medium text-gray-700 font-integral">
                    {placeholder}
                    {required && (
                        <span className="text-red-500 ml-1 text-xs font-mono">
                            *
                        </span>
                    )}
                </label>
                <textarea
                    value={value as string}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-gray-100 px-2 py-2 max-h-36 outline-none border focus:ring-offset-2 focus:ring-2 focus:ring-primary font-mono placeholder:font-integral"
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1 w-full">
            <label className="block text-sm font-medium text-gray-700 font-integral">
                {placeholder}
                {required && (
                    <span className="text-red-500 ml-1 text-xs font-mono">
                        *
                    </span>
                )}
            </label>
            <input
                type={type}
                value={value as string}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-gray-100 px-2 py-2 outline-none border focus:ring-offset-2 focus:ring-2 focus:ring-primary font-mono placeholder:font-integral"
            />
        </div>
    );
};
