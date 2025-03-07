<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BudgetsController;
use App\Http\Controllers\InvestmentsController;
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::post('register',[AuthController::class, 'register']);
Route::post('login',[AuthController::class, 'login']);
// Route::post('/logout',[AuthController::class, 'logout']);

Route::apiResource('/users', UserController::class);

Route::apiResource('/transactions', TransactionsController::class);
// Route::post('/transactions/import',[TransactionsController::class,'import']);

Route::apiResource('/budgets', BudgetsController::class);

Route::apiResource('/investments', InvestmentsController::class);