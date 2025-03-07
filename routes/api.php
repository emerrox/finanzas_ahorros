<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BudgetsController;
use App\Http\Controllers\InvestmentsController;
use App\Http\Controllers\TransactionsController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;



Route::post('/auth/register',[AuthController::class, 'register']);
Route::post('/auth/login',[AuthController::class, 'login']);

//
// TODO: convertir en rutas protegidas
//
// Route::middleware('auth:sanctum')->group(function () {
    // Route::get('/users/{id}',[UserController::class, 'getUser']);
    Route::apiResource('/users', UserController::class);
    // Route::middleware('auth:sanctum')->group(function () {
    // });

    Route::apiResource('/transactions', TransactionsController::class);
    // Route::get('/transactions',[TransactionsController::class,'getTransactions']);
    // Route::get('/transactions/{id}',[TransactionsController::class,'getTransaction']);
    // Route::post('/transactions',[TransactionsController::class,'create']);
    // Route::put('/transactions/{id}',[TransactionsController::class,'setTransaction']);
    // Route::delete('/transactions/{id}',[TransactionsController::class,'remove']);
    // Route::post('/transactions/import',[TransactionsController::class,'import']);

    Route::apiResource('/budgets', BudgetsController::class);
    // Route::get('/budgets',[BudgetsController::class,'getBudgets']);
    // Route::get('/budgets/{id}',[BudgetsController::class,'getBudget']);
    // Route::post('/budgets',[BudgetsController::class,'create']);
    // Route::put('/budgets/{id}',[BudgetsController::class,'setBudget']);
    // Route::delete('/budgets/{id}',[BudgetsController::class,'remove']);
    
    Route::apiResource('/investments', InvestmentsController::class);
    // Route::get('/investments',[InvestmentsController::class,'getInvestments']);
    // Route::get('/investments/{id}',[InvestmentsController::class,'getInvestment']);
    // Route::post('/investments',[InvestmentsController::class,'create']);
    // Route::put('/investments/{id}',[InvestmentsController::class,'setInvestment']);
    // Route::delete('/investments/{id}',[InvestmentsController::class,'remove']);
// });