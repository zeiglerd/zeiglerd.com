<?php // declare(strict_types=1);

namespace ZeiglerD\PhpEngine\Models;

use ZeiglerD\PhpEngine\Db;
use ZeiglerD\PhpEngine\Helpers;
use ZeiglerD\PhpEngine\Model;

final class Skill extends Model
{
  /**
   * @param array
   */
  protected $title;

  // /**
  //  * @param array
  //  */
  // protected $prioritizedRoles;

  /**
   * @param bool
   */
  protected $keySkill;

  /**
   * @param bool
   */
  protected $displayAsList;

  /**
   * @param Skill[]
   */
  protected $subSkills;

  /**
   * @param array $skill
   * @example [
   *   'title' => '',
   *   'prioritizedRoles' => '',
   *   'keySkill' => '',
   *   'displayAsList' => '',
   *   'subSkills' => array $skill,
   * ]
   */
  public final function findOneOrDispense($skill) {
    $sql = '';
    $bindings = [];
    return $this->t->Db::findOneOrDispense('skill', $sql, $bindings);
  }

  /**
   * @param array $skills
   * @example [
   *   [
   *     'title' => '',
   *     'prioritizedRoles' => '',
   *     'keySkill' => '',
   *     'displayAsList' => '',
   *     'subSkills' => array $skill,
   *   ]
   * ]
   */
  public final function findOneOrDispenseAll($skills) {
    foreach ($skills as $key => $value) {
      $this->findOneOrDispense($skills);
    }
  }



}
