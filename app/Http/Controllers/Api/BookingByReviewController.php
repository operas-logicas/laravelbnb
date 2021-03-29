<?php

namespace App\Http\Controllers\Api;

use App\Models\Booking;
use App\Http\Controllers\Controller;
use App\Http\Resources\BookingByReviewShowResource;
use Illuminate\Http\Request;

class BookingByReviewController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Http\Resources\BookingByReviewShowResource | void
     */
    public function __invoke($reviewKey, Request $request)
    {
        return new BookingByReviewShowResource(
            Booking::findByReviewKey($reviewKey)
        ) ?? abort(404);
    }
}
