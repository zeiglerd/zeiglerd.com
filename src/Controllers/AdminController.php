<?php // declare(strict_types=1);

namespace ZeiglerD\ZeiglerD\Controllers;

class AdminController extends \ZeiglerD\PhpEngine\Controllers\AdminController
{
  public function packDb($t) {
    $db = parent::packDb($t);

    $pageHome = $db::findOrCreate('page', [
      'title' => 'Welcome to ZeiglerD!',
      'message' => ''
    ]);

    $t->Template->renderView([]);
  }
}
