<?php // declare(strict_types=1);

namespace ZeiglerD\ZeiglerD\Controllers;

class AdminController extends \ZeiglerD\PhpEngine\Controllers\AdminController
{
  public function packDb($t, $render = true) {
    parent::packDb($t, !$render);

    $pageHome = $t->Db::findOrCreate('page', [
      'title' => 'Welcome to ZeiglerD!',
      'message' => ''
    ]);

    return $t->Template->renderView([]);
  }
}
