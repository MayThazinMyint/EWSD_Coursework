<?php

namespace App\Http\Requests;

class UserRegisterRequest extends ApiRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|max:50',
            'email' => 'required|max:50',
            'password' => 'required|min:8|max:20'
        ];
    }
}