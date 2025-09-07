<?php // declare(strict_types=1);

namespace ZeiglerD\ZeiglerD\Controllers;

use \ZeiglerD\PhpEngine\Controller;

final class GamesController extends Controller
{
  final public function cheddar() {
    $this->toolkit->addScripts([
      'views/games/cheddar/cheddar-locale.min.js',
      'views/games/cheddar/cheddar.min.js',
    ]);
    return $this->toolkit->Template->renderView([]);
  }

  final public function geordie() {
    $this->toolkit->addScripts([
      'views/games/geordie/geordie-locale.min.js',
      'views/games/geordie/geordie.min.js',
    ]);
    return $this->toolkit->Template->renderView([]);
  }
}
