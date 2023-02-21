<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'category_code',
        'category_type',
        'is_active',
        'created_date',
        'updated_date'
    ];

    protected $table = 'categories';
    protected $primaryKey = 'category_id';

    public $timestamps = false;
}
