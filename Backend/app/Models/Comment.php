<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'comment_description',
        'is_anonymous',
        'user_id',
        'idea_id',
        'created_date',
        'updated_date'
    ];
    public $timestamps = false;
    protected $primaryKey = 'comment_id';
}
