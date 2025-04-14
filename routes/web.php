<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BudgetsController;
use App\Http\Controllers\transactionsController;
use App\Http\Controllers\UserController;

Route::get('/login', [AuthController::class, 'create'])->name('login')->middleware('guest');
Route::post('/logout', [AuthController::class, 'destroy'])->name('logout')->middleware('auth');
Route::post('/login', [AuthController::class, 'store'])->name('login.store')->middleware('guest');
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome')->middleware('guest');

Route::middleware('auth')->group(function () {

    Route::get('/dashboard', [UserController::class, 'show'])->name('dashboard');

    Route::get('/transactions', [transactionsController::class, 'index'])->name('transactions.index');
    
    Route::post('/transactions', [transactionsController::class, 'store'])
    ->name('transactions.store')
    ->defaults('inertia', true);

    Route::get('/budgets', [BudgetsController::class, 'index'])->name('budgets.index');

    Route::get('transactions', [transactionsController::class, 'index'])->name('transactions.index');
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->name('dashboard')->middleware('auth');