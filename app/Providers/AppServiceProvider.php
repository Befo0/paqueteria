<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        $this->removeIndexPHPFromUrl();
    }

    protected function removeIndexPHPFromUrl(){
        if(Str::contains(request()->getRequestUri(), '/index.php/')){
            $url = str_replace('index.php/', '', request()->getRequestUri());

            if(strlen($url) > 0){
                header("Location: $url", true, 301);
                exit;
            }
        }
    }
}
