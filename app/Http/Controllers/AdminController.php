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
    /**
     * Shows a list of the registered users excluding the administrador
     */
    public function index(Request $request)
    {
        Gate::authorize('viewAny', User::class);

        $adminId = $request->user()->id;

        $users = User::select(['users.id', 'users.name', 'users.email', 'users.isActive', 'roles.nombreRol as rol'])
            ->join('roles', 'roles.id', '=', 'users.idRol')
            ->where('users.id', '!=', $adminId);

        if (strlen($request->state_id) > 0 && $request->state_id < 2) {
            $users = $users->where('isActive', $request->state_id);
        }

        $users = $users->paginate(5);

        $roles = Roles::select(['id', 'nombreRol'])->get();

        return Inertia::render('Admin/AdminUsers', [
            'usersData' => $users,
            'roles' => $roles,
        ]);
    }

    /**
     * Logic in charge of changing the role to a user
     */
    public function changeRole(RoleUserRequest $request, User $user)
    {
        Gate::authorize('update', User::class);

        $validated = $request->validated();

        $user->update([
            'idRol' => $validated['idRol']
        ]);

        return redirect(route('admin.users'));
    }

    public function ActivateUser(User $user)
    {
        Gate::authorize('update', User::class);

        $user->update([
            'isActive' => true,
        ]);

        return redirect(route('admin.users'));
    }

    public function deleteUser(User $user)
    {
        Gate::authorize('delete', User::class);

        $user->update([
            'isActive' => false,
        ]);

        return redirect(route('admin.users'));
    }
}
