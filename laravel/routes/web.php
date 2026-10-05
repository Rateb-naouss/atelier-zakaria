<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\SitemapController;

/*
|--------------------------------------------------------------------------
| Web Routes - مشغل حدادة افرنجية وألمنيوم – المعلم زكريا جواد
|--------------------------------------------------------------------------
*/

Route::middleware(['web', 'throttle:60,1'])->group(function () {
    // الصفحة الرئيسية
    Route::get('/', [HomeController::class, 'index'])->name('home');

    // صفحة من نحن
    Route::get('/about', [PageController::class, 'about'])->name('about');

    // خدماتنا (ألمنيوم / حدادة)
    Route::get('/services/{slug}', [ServiceController::class, 'show'])->name('services.show');

    // معرض الأعمال والألبومات
    Route::get('/gallery', [AlbumController::class, 'index'])->name('gallery.index');
    Route::get('/gallery/{slug}', [AlbumController::class, 'show'])->name('gallery.show');

    // صفحة تواصل معنا
    Route::get('/contact', [ContactController::class, 'show'])->name('contact.show');
    Route::post('/contact', [ContactController::class, 'store'])
        ->middleware('throttle:5,1')
        ->name('contact.store');

    // خريطة الموقع لمحركات البحث
    Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');
});
