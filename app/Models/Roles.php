<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Roles extends Model
{

    public function User(){
        return $this->hasMany(User::class);
    }
}
