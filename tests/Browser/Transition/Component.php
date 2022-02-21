<?php

namespace Tests\Browser\Transition;

use Illuminate\Support\Facades\View;
use Livewire\Component as BaseComponent;

class Component extends BaseComponent
{
    public $show = true;

    public function toggle()
    {
        $this->show = !$this->show;
    }

    public function render()
    {
        return View::file(__DIR__.'/view.blade.php');
    }
}
