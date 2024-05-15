window.geordie = {
  ...window.geordie ?? {},

  localeMap: {
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
      { value: 11, key: 'localeMap.jack' },
      { value: 12, key: 'localeMap.queen' },
      { value: 13, key: 'localeMap.king' },
      { value: 14, key: 'localeMap.ace' }
    ],
    suits: [
      { colorKey: 'localeMap.black', suitKey: 'localeMap.clubs' },
      { colorKey: 'localeMap.red', suitKey: 'localeMap.diamonds' },
      { colorKey: 'localeMap.black', suitKey: 'localeMap.spades' },
      { colorKey: 'localeMap.red', suitKey: 'localeMap.hearts' }
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
    red_or_black: 'Red or Black',
    higher_or_lower: 'Higher or Lower',
    inside_or_outside: 'Inside or Outside',
    actions: 'Actions',
  },
  getLocaleKey: (localeKey) => typeof localeKey === 'string'
    ? localeKey.replace('localeMap.', '')
    : localeKey,
  getLocale: (localeKey) => window.geordie.localeMap[window.geordie.getLocaleKey(localeKey)] ?? localeKey
}

$(() => {

  $('[data-locale-key]').each((index, element) => {
    const key = $(element).data('locale-key')
    $(element).html(window.geordie.getLocale(key))
  })

  $('[data-before-key]').each((index, element) => {
    const key = $(element).data('before-key')
    const beforeString = window.geordie.getLocale(key)
    $(element).attr('style', `--before-string: '${beforeString}'`)
  })

})
