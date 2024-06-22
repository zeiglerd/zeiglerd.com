const geordie = {
  ...window.geordie ?? {}
}

geordie.localeMap = {
  cards: [
    { value: 2, key: 2 },
    { value: 3, key: 3 },
    { value: 4, key: 4 },
    { value: 5, key: 5 },
    { value: 6, key: 6 },
    { value: 7, key: 7 },
    { value: 8, key: 8 },
    { value: 9, key: 9 },
    { value: 10, key: 10 },
    { value: 11, key: '{{jack}}' },
    { value: 12, key: '{{queen}}' },
    { value: 13, key: '{{king}}' },
    { value: 14, key: '{{ace}}' }
  ],
  suits: [
    { colorKey: '{{black}}', suitKey: '{{clubs}}' },
    { colorKey: '{{red}}', suitKey: '{{diamonds}}' },
    { colorKey: '{{black}}', suitKey: '{{spades}}' },
    { colorKey: '{{red}}', suitKey: '{{hearts}}' }
  ],
  jack: 'Jack',
  queen: 'Queen',
  king: 'King',
  ace: 'Ace',
  clubs: 'Clubs',
  diamonds: 'Diamonds',
  spades: 'Spades',
  hearts: 'Hearts',
  red: 'Red',
  black: 'Black',
  higher: 'Higher',
  lower: 'Lower',
  same_x1: 'Same (divvy +1 drink)',
  inside: 'Inside',
  outside: 'Outside',
  same_x2: 'Same (divvy +2 drinks)',
  start_game: 'Start Game',
  shuffle_deck: 'Shuffle Deck',
  finish_turn: 'Finish Turn',
  deck: 'Deck',
  discard: 'Discard',
  ongoing: 'Ongoing',
  red_or_black: '{{red}} or {{black}}..?',
  higher_or_lower: '{{higher}} or {{lower}}..?',
  inside_or_outside: '{{inside}} or {{outside}}..?',
  actions: 'Actions will appear here...',
  start_game_prompt: 'Click \'{{start_game}}\' to begin!',
  shuffle_deck_prompt: 'Click \'{{shuffle_deck}}\' to continue!',
  finish_turn_prompt: 'Click \'{{finish_turn}}\' to pass to next player!',
  red_or_black_prompt: 'Will the next card be <span class="red">{{red}}</span> or <span class="black">{{black}}</span>?',
  higher_or_lower_prompt: `Will the next card be <span class="higher">{{higher}}</span> or <span class="lower">{{lower}}</span>
      <br>than a \\{\\{redOrBlackCard.card.value\\}\\}?`,
  inside_or_outside_prompt: `Will the next card be <span class="inside">{{inside}}</span> or <span class="outside">{{outside}}</span>
      <br>of a \\{\\{redOrBlackCard.card.value\\}\\} and \\{\\{higher_or_lower_prompt.card.value\\}\\}?`,
},
geordie.getLocaleKey = (substr) => typeof substr === 'string' ? substr.substring(2, substr.length - 2) : substr
geordie.getLocale = (localeKey) => geordie.expandLocale(geordie.localeMap[localeKey]) ?? localeKey
geordie.expandLocale = (locale, overrides = []) => {
  const override = overrides.shift()
  if (locale && locale.includes('{{') && locale.includes('}}')) {
    const localeKey = locale.substring(locale.indexOf('{{') + 2, locale.indexOf('}}'))
    return geordie.expandLocale(
      locale.replaceAll(`{{${localeKey}}}`, override ?? geordie.getLocale(localeKey)),
      overrides
    )
  }
  return locale.replaceAll('\\{\\{', '{{').replaceAll('\\}\\}', '}}')
}

window.geordie = geordie

$(() => {

  $('[data-locale-key]').each((index, element) => {
    const key = $(element).data('locale-key')
    $(element).html(geordie.getLocale(key))
  })

  $('[data-before-key]').each((index, element) => {
    const key = $(element).data('before-key')
    const beforeString = geordie.getLocale(key)
    $(element).attr('style', `--before-string: '${beforeString}'`)
  })

})
