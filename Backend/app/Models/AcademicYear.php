<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicYear extends Model
{
    use HasFactory;

    protected $fillable = [
        'academic_id',
        'academic_year_code',
        'academic_year',
        'academic_sdate',
        'academic_edate',
        'final_closure_date',
        'is_active',
        'created_date',
        'updated_date'
    ];

    protected $table = 'academic_years';
    protected $primaryKey = 'academic_id';

    public $timestamps = false;
}
