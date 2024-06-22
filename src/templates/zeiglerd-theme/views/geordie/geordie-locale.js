const geordie = {
  ...window.geordie ?? {}
}

geordie.localeMap = {
  cards: [
    { displayValue: '2', numericValue: 2, imageKey: 2 },
    { displayValue: '3', numericValue: 3, imageKey: 3 },
    { displayValue: '4', numericValue: 4, imageKey: 4 },
    { displayValue: '5', numericValue: 5, imageKey: 5 },
    { displayValue: '6', numericValue: 6, imageKey: 6 },
    { displayValue: '7', numericValue: 7, imageKey: 7 },
    { displayValue: '8', numericValue: 8, imageKey: 8 },
    { displayValue: '9', numericValue: 9, imageKey: 9 },
    { displayValue: '10', numericValue: 10, imageKey: 10 },
    { displayValue: '{{jack}}', numericValue: 11, imageKey: '{{jack}}' },
    { displayValue: '{{queen}}', numericValue: 12, imageKey: '{{queen}}' },
    { displayValue: '{{king}}', numericValue: 13, imageKey: '{{king}}' },
    { displayValue: '{{ace}}', numericValue: 14, imageKey: '{{ace}}' }
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
  higher_or_lower_prompt: `Will the next card be
      <br><span class="higher">{{higher}}</span> or <span class="lower">{{lower}}</span>
      than a \\{\\{redOrBlackCard.card.value\\}\\}?`,
  inside_or_outside_prompt: `Will the next card be
      <br><span class="inside">{{inside}}</span> or <span class="outside">{{outside}}</span>
      of a \\{\\{redOrBlackCard.card.value\\}\\} and \\{\\{higher_or_lower_prompt.card.value\\}\\}?`,
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
