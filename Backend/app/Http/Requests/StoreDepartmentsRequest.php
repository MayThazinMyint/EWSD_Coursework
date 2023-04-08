<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDepartmentsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        if(request()->isMethod('post')) {
            return [
                'department_code' => 'string|max:20',
                'department_description' => 'string|max:20'
            ];
        } 
    }
//required|string|max:20
    public function messages()
    {
        if(request()->isMethod('post')) {
            return [
                'department_code.required' => 'Department Code is required!',
                'department_description.required' => 'Department Descritpion is required!'
            ];
        }
    }
}
