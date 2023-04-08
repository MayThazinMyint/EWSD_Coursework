<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ideas extends Model
{
    use HasFactory;
    

    protected $fillable = [
        'idea_id',
        'category_id',
        'user_id',
        'academic_id',
        'idea_description',     
        'is_anonymous',
        'file_path',
        'created_date',
        'updated_date'  
    ];
       

    protected $table = 'ideas';
    protected $primaryKey = 'idea_id';

    public $timestamps = false;
    
    /**
     * Get the user that owns the ideas
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function academic_years()
    {
        return $this->belongsTo(AcademicYear::class, 'academic_id');
    }

    public function department()
    {
        return $this->hasOneThrough(Department::class, User::class, "id", "department_id", "user_id", "department_id");
    }
}
