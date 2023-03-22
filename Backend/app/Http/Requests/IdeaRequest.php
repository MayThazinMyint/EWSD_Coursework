<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IdeaRequest extends FormRequest
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
                'idea_description' => 'required',
                'category_id' => 'required|integer',
                'user_id' => 'required|integer',
                'is_anonymous' => 'required|boolean',
                'attachment' => 'mimes:jpg,png,jpeg,gif,svg,pdf,docx'
            ];
        } else {
            return [];
        }

    }
}
