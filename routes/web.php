<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BudgetsController;
use App\Http\Controllers\InvestmentsController;
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Route::post('/auth/register',[AuthController::class, 'register']);
// Route::put('/auth/login',[AuthController::class, 'login']);

//
// TODO: convertir en rutas protegidas
//

Route::get('/users',[UserController::class, 'getUser']);
Route::put('/users/{id}',[UserController::class, 'setUser']);

// Route::get('/transactions',[TransactionsController::class,'getTransactions']);
// Route::get('/transactions/{id}',[TransactionsController::class,'getTransaction']);
// Route::post('/transactions',[TransactionsController::class,'create']);
// Route::put('/transactions/{id}',[TransactionsController::class,'setTransaction']);
// Route::delete('/transactions/{id}',[TransactionsController::class,'remove']);
// Route::post('/transactions/import',[TransactionsController::class,'import']);

// Route::get('/budgets',[BudgetsController::class,'getBudgets']);
// Route::get('/budgets/{id}',[BudgetsController::class,'getBudget']);
// Route::post('/budgets',[BudgetsController::class,'create']);
// Route::put('/budgets/{id}',[BudgetsController::class,'setBudget']);
// Route::delete('/budgets/{id}',[BudgetsController::class,'remove']);

// Route::get('/investments',[InvestmentsController::class,'getInvestments']);
// Route::get('/investments/{id}',[InvestmentsController::class,'getInvestment']);
// Route::post('/investments',[InvestmentsController::class,'create']);
// Route::put('/investments/{id}',[InvestmentsController::class,'setInvestment']);
// Route::delete('/investments/{id}',[InvestmentsController::class,'remove']);