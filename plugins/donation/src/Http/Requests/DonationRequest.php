<?php

namespace Botble\Donation\Http\Requests;

use Botble\Support\Http\Requests\Request;

class DonationRequest extends Request
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     * @author Sang Nguyen
     */
    public function rules()
    {
        return [
            'name' => 'required',
        ];
    }
}