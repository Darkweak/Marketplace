<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\RedirectResponse;

class DefaultController
{
    public function __invoke()
    {
        return new RedirectResponse(getenv('BASE_URL'));
    }
}
