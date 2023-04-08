<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voting extends Model
{
    use HasFactory;

    protected $fillable = [
        'idea_id',
        'user_id',
        'is_liked',
        'is_unliked'
    ];

    protected $table = 'voting';
    protected $primaryKey = 'voting_id';

    public $timestamps = false;
}
