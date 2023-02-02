<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

/** @see \App\Models\User */
class UserResourceCollection extends ResourceCollection
{
    public static $wrap = 'users';
    
    /**
     * @param Request $request
     * @return array
     */
    public function toArray($request)
    {
        return $this->resource->map(fn($user) => new UserResource($user))->toArray();
    }
}
