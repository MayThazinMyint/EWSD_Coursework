<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'user_name' => 'required|max:50',
            'email' => 'required|max:50'
        ];
    }
}
