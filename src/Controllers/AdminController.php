<?php // declare(strict_types=1);

namespace ZeiglerD\ZeiglerD\Controllers;

use ZeiglerD\PhpEngine\Controllers\AdminController as Controller;
use ZeiglerD\PhpEngine\Models\Page;

class AdminController extends Controller
{
  public function packDb($render = true) {
    parent::packDb(!$render);

    $homePage = (new Page($t))->findOrCreate([
      'title' => 'Welcome to Zeigler D!',
      'message' => '',
      'homepage' => 1
    ]);

    return $this->t->Template->renderView([]);
  }
}
