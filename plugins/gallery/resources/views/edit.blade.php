@extends('bases::layouts.master')
@section('content')
    {!! Form::open(['route' => ['galleries.edit', $gallery->id]]) !!}
    @php do_action(BASE_ACTION_EDIT_CONTENT_NOTIFICATION, GALLERY_MODULE_SCREEN_NAME, request(), $gallery) @endphp
    <div class="row">
        <div class="col-md-9">
            <div class="main-form">
                <div class="form-body">
                    <div class="form-group @if ($errors->has('name')) has-error @endif">
                        <label for="name" class="control-label required">{{ trans('bases::forms.name') }}</label>
                        {!! Form::text('name', $gallery->name, ['class' => 'form-control', 'id' => 'name', 'placeholder' => trans('bases::forms.name_placeholder'), 'data-counter' => 120]) !!}
                        {!! Form::error('name', $errors) !!}
                    </div>
                    <!-- <div class="form-group">
                        {!! Form::permalink('slug', $gallery->slug, $gallery->id, route('galleries.create.slug'), route('public.gallery', config('cms.slug.pattern')), url('/gallery/')) !!}
                        {!! Form::error('slug', $errors) !!}
                    </div> -->
                    <div class="form-group @if ($errors->has('description')) has-error @endif">
                        <label for="description" class="control-label required">{{ trans('bases::forms.description') }}</label>
                        {!! Form::textarea('description', $gallery->description, ['class' => 'form-control', 'rows' => 4, 'id' => 'description', 'placeholder' => trans('bases::forms.description'), 'data-counter' => 400]) !!}
                        {!! Form::error('description', $errors) !!}
                    </div>
                    <div class="form-group @if ($errors->has('order')) has-error @endif">
                        <label for="order" class="control-label">{{ trans('bases::forms.order_by') }}</label>
                        {!! Form::text('order', $gallery->order, ['class' => 'form-control', 'id' => 'order', 'placeholder' => trans('bases::forms.order_by_placeholder'), 'data-counter' => 60]) !!}
                        {!! Form::error('order', $errors) !!}
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-3 right-sidebar">
            @include('bases::elements.form-actions')
            @include('bases::elements.forms.status', ['selected' => $gallery->status])
            @php do_action(BASE_ACTION_META_BOXES, GALLERY_MODULE_SCREEN_NAME, 'top', $gallery) @endphp
            <div class="widget meta-boxes">
                <div class="widget-title">
                    <h4><span>{{ trans('bases::forms.image') }}</span></h4>
                </div>
                <div class="widget-body">
                    {!! Form::mediaImage('image', $gallery->image) !!}
                    {!! Form::error('image', $errors) !!}
                </div>
            </div>
            @php do_action(BASE_ACTION_META_BOXES, GALLERY_MODULE_SCREEN_NAME, 'side', $gallery) @endphp
        </div>
    </div>
    {!! Form::close() !!}
@stop
