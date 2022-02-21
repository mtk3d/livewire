<?php

namespace Tests\Browser\Transition;

use Livewire\Livewire;
use Tests\Browser\TestCase;
use Tests\Browser\Transition\Component;

class Test extends TestCase
{
    public function test_native_transition()
    {
        $this->browse(function ($browser) {
            Livewire::visit($browser, Component::class)
                // Wait for Livewire to respond, but dusk helper won't
                // work as dialog box is stopping further execution
                ->pause(1000 * 60 * 10)
            ;
        });
    }
}
