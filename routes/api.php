<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')
    ->get('/user', function (Request $request) {
        return $request->user();
    });

Route::apiResource(
    'bookables',
    'Api\BookableController'
)->only('index', 'show');

Route::group([
    'prefix' => 'bookables/{bookable}'
], function () {
    Route::get(
        'availability',
        'Api\BookableAvailabilityController'
    )->name('bookables.availability.show');

    Route::get(
        'price',
        'Api\BookablePriceController'
    )->name('bookables.price.show');

    Route::get(
        'reviews',
        'Api\BookableReviewController'
    )->name('bookables.reviews.index');
});

Route::get(
    'booking-by-review/{reviewKey}',
    'Api\BookingByReviewController'
)->name('booking.booking-by-review.show');

Route::post(
    'checkout',
    'Api\CheckoutController'
)->name('checkout');

Route::apiResource(
    'reviews',
    'Api\ReviewController'
)->only('show', 'store');
