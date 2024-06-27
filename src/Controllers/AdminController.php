<?php // declare(strict_types=1);

namespace ZeiglerD\ZeiglerD\Controllers;

use ZeiglerD\PhpEngine\Helpers;

class AdminController extends \ZeiglerD\PhpEngine\Controllers\AdminController
{
  public function packDb($Router, $Template) {
    $db = parent::packDb($Router, $Template);

    $pageHome = $db::findOrCreate('page', [
      'title' => 'Welcome to ZeiglerD!',
      'message' => ''
    ]);

    $this->render([]);
  }
}
