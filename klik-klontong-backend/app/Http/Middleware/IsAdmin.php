<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Pengecekan 1: Pastikan user login
        // Pengecekan 2: Pastikan properti is_admin di user object-nya TRUE

        // Kita gunakan $request->user() yang dijamin ada jika rute
        // dilindungi oleh 'auth:sanctum'
        if ($request->user() && $request->user()->is_admin) {
            // Jika LULUS, lanjutkan ke Controller
            return $next($request);
        }

        // Jika GAGAL, kirim response 403 Forbidden
        return response()->json(['message' => 'Unauthorized. Admin access required.'], 403);
    }
}
