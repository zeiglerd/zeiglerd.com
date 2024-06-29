<?php // declare(strict_types=1);

namespace ZeiglerD\ZeiglerD\Controllers;

final class GamesController extends \ZeiglerD\PhpEngine\Controller
{
  final public function cheddar($t) {
    $t->addScripts([
      'views/games/cheddar/cheddar-locale.min.js',
      'views/games/cheddar/cheddar.min.js',
    ]);
    return $t->Template->renderView([]);
  }

  final public function geordie($t) {
    $t->addScripts([
      'views/games/geordie/geordie-locale.min.js',
      'views/games/geordie/geordie.min.js',
    ]);
    return $t->Template->renderView([]);
  }
}
