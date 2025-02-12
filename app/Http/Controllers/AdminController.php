<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleUserRequest;
use App\Models\Roles;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index(Request $request) 
    {
        $adminId = $request->user()->id;

        $users = User::select(['users.id', 'users.name', 'users.email', 'roles.nombreRol as rol'])
                    ->join('roles', 'roles.id', '=', 'users.idRol')
                    /* ->where('id', '!=', $adminId) */
                    ->paginate(5);

        $roles = Roles::select(['id', 'nombreRol'])->get();

        return Inertia::render('Admin/AdminUsers', [
            'usersData' => $users,
            'roles' => $roles,
        ]);
    }

    public function changeRole(RoleUserRequest $request, User $user)
    {
        Gate::authorize('update', User::class);

        $validated = $request->validated();

        $user->update([
            'idRol' => $validated['idRol']
        ]);

        return redirect(route('admin.users'));
    }

    public function deleteUser(User $user)
    {
        Gate::authorize('delete', User::class);

        $user->delete();

        return redirect(route('admin.users'));
    }

}
