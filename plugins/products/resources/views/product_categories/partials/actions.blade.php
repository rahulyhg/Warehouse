<a href="{{ route('product_categories.edit', $item->id) }}" class="btn btn-icon btn-primary tip" data-original-title="{{ trans('bases::tables.edit') }}"><i class="fa fa-edit"></i></a>
@if (!$item->is_default)
    <a class="btn btn-icon btn-danger deleteDialog tip" data-toggle="modal" data-section="{{ route('product_categories.delete', $item->id) }}" role="button" data-original-title="{{ trans('bases::tables.delete_entry') }}" >
        <i class="fa fa-trash-o"></i>
    </a>
@endif
