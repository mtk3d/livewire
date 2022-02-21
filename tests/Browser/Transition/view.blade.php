<div>
    <button wire:click="toggle" dusk="hide">Hide</button>
    @if($show)
        <div wire:transition>Example text</div>
    @endif
</div>
