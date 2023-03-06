<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'department_id',
        'department_code',
        'department_description',
        'created_date',
        'updated_date',
       
    ];

    protected $table = 'departments';
    protected $primaryKey = 'department_id';

    public $timestamps = false;
}
