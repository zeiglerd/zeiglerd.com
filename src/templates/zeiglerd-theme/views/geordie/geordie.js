const DEBUG = 1
const CLICK_DELAY = 350

const cardPath = '/images/templates/zeiglerd-theme/views/geordie'

$(() => {
  const $deckCard = $('#deck').find('.card')
  const $discardCard = $('#discard').find('.card')
  const $ongoingCard = $('#ongoing').find('.card')
  const $redOrBlackCard = $('#red-or-black').find('.card')
  const $higherOrLowerCard = $('#higher-or-lower').find('.card')
  const $insideOrOutsideCard = $('#inside-or-outside').find('.card')

  const shuffleArray = (array) => {
    return array
      .map((item) => {
        return { value: item, sort: Math.random() }
      })
      .sort((a, b) => {
        return a.sort - b.sort
      })
      .map((object) => {
        return object.value
      })
  }

  const getTopCard = (cards) => cards.state && cards.state.length ? cards.state[cards.state.length - 1] : undefined

  const deck = {
    state: undefined,
    deal: (shuffle) => {
      deck.state = []

      window.geordie.localeMap.suits.forEach((suit) => {
        window.geordie.localeMap.cards.forEach((card) => {
          deck.state.push({
            card: {
              value: card.value,
              key: window.geordie.getLocaleKey(card.key),
            },
            suit: {
              colorKey: window.geordie.getLocaleKey(suit.colorKey),
              color: window.geordie.expandLocale(suit.colorKey),
              suitKey: window.geordie.getLocaleKey(suit.suitKey),
              suit: window.geordie.expandLocale(suit.suitKey)
            }
          })
        })
      })

      deck.state = shuffle ? shuffleArray(deck.state) : deck.state
    },
    render: () => {
      const topCard = getTopCard(deck)
      const imgSrc = topCard
        ? `${cardPath}/backs/astronaut.svg`
        : `${cardPath}/other/blank_card_no_fill.svg`
      $deckCard.find('img').attr('src', imgSrc)
    }
  }

  const discard = {
    state: [],
    render: () => {
      const topCard = getTopCard(discard)
      const imgSrc = topCard
        ? `${cardPath}/fronts/${topCard.suit.suitKey}_${topCard.card.key}.svg`
        : `${cardPath}/other/blank_card_no_fill.svg`
      $discardCard.find('img').attr('src', imgSrc)
    }
  }

  const ongoing = {
    state: [],
    render: () => {
      const topCard = getTopCard(ongoing)
      const imgSrc = topCard
        ? `${cardPath}/fronts/${topCard.suit.suitKey}_${topCard.card.key}.svg`
        : `${cardPath}/other/blank_card_no_fill.svg`
      $ongoingCard.find('img').attr('src', imgSrc)
    }
  }

  const redOrBlack = {
    state: [],
    render: () => {
      const topCard = getTopCard(redOrBlack)
      const imgSrc = topCard
        ? (
          lastAction === 'higherOrLower'
            ? `${cardPath}/fronts/${topCard.suit.suitKey}_${topCard.card.key}.svg`
            : `${cardPath}/backs/astronaut.svg`
        )
        : `${cardPath}/other/blank_card_no_fill.svg`
      $redOrBlackCard.find('img').attr('src', imgSrc)
    }
  }

  const higherOrLower = {
    state: [],
    render: () => {
      const topCard = getTopCard(higherOrLower)
      const imgSrc = topCard
        ? (
          lastAction === 'insideOrOutside'
            ? `${cardPath}/fronts/${topCard.suit.suitKey}_${topCard.card.key}.svg`
            : `${cardPath}/backs/astronaut.svg`
        )
        : `${cardPath}/other/blank_card_no_fill.svg`
      $higherOrLowerCard.find('img').attr('src', imgSrc)
    }
  }

  const insideOrOutside = {
    state: [],
    render: () => {
      const topCard = getTopCard(insideOrOutside)
      const imgSrc = topCard
        ? (
          lastAction === 'ongoing'
            ? `${cardPath}/fronts/${topCard.suit.suitKey}_${topCard.card.key}.svg`
            : `${cardPath}/backs/astronaut.svg`
        )
        : `${cardPath}/other/blank_card_no_fill.svg`
      $insideOrOutsideCard.find('img').attr('src', imgSrc)
    }
  }

  const finishTurn = (doDiscard) => {
    const discardTo = doDiscard ? discard : ongoing

    if (doDiscard && ongoing.state.length) {
      ongoing.state.forEach((each) => {
        discard.state.push(each)
      })
      ongoing.state = []
      ongoing.render()
    }

    if (redOrBlack.state.length) {
      redOrBlack.state.forEach((each) => {
        discardTo.state.push(each)
      })
      redOrBlack.state = []
      redOrBlack.render()
    }

    if (higherOrLower.state.length) {
      higherOrLower.state.forEach((each) => {
        discardTo.state.push(each)
      })
      higherOrLower.state = []
      higherOrLower.render()
    }

    if (insideOrOutside.state.length) {
      insideOrOutside.state.forEach((each) => {
        discardTo.state.push(each)
      })
      insideOrOutside.state = []
      insideOrOutside.render()
    }

    discardTo.render()
  }

  const takeCard = () => {
    const card = deck.state.pop()
    deck.render()
    return card
  }

  let lastButtons
  let lastScrollIntoView
  const toggleButtons = (buttons, scrollIntoView, overrides) => {
    $('button').prop('disabled', true)
    $('.action-container').find('p').hide()

    if (deck.state.length) {
      const selector = buttons.map((button) => `[data-locale-key=${button}]`).join(',')

      const $selector = $(selector)
      $selector.prop('disabled', false)

      const $p = $selector.closest('.action-container').find('p')
      const html = $p.data('orig') ?? $p.html()
      $p.data('orig', html)
        .html(window.geordie.expandLocale(html, overrides))
        .show()

      $(scrollIntoView)[0].scrollIntoView()
    } else {
      lastButtons = buttons
      lastScrollIntoView = scrollIntoView

      $('[data-locale-key=shuffle_deck]').prop('disabled', false)

      $('#discard')[0].scrollIntoView()
    }
  }

  let lastAction
  const nextAction = (action, doDiscard) => {
    lastAction = action

    let redOrBlackCard
    let higherOrLowerCard
    let insideOrOutsideCard

    switch(action) {
      case 'start_game':
        if (!deck.state) {
          deck.deal(true)
        }
        return nextAction('redOrBlack')

      case 'shuffle_deck':
        if (!deck.state.length) {
          discard.state.forEach((each) => {
            deck.state.push(each)
          })
          discard.state = []
          discard.render()

          deck.state = shuffleArray(deck.state)
          deck.render()

          return toggleButtons(lastButtons, lastScrollIntoView)
        }
        return nextAction('redOrBlack')

      case 'redOrBlack':
        finishTurn(doDiscard)

        redOrBlack.state.push(takeCard())
        redOrBlack.render()

        return toggleButtons(['red', 'black'], '#red-or-black')

      case 'red':
      case 'black':
        if (redOrBlack.state.length && !higherOrLower.state.length && !insideOrOutside.state.length) {
          redOrBlackCard = redOrBlack.state[redOrBlack.state.length - 1]

          if (DEBUG > 1 || (
            action === redOrBlackCard.suit.colorKey
          )) {
            return nextAction('higherOrLower')
          }
        }
        return nextAction('redOrBlack')

      case 'higherOrLower':
        if (redOrBlack.state.length && !higherOrLower.state.length && !insideOrOutside.state.length) {
          redOrBlackCard = redOrBlack.state[redOrBlack.state.length - 1]

          redOrBlack.render()

          higherOrLower.state.push(takeCard())
          higherOrLower.render()

          return toggleButtons(['higher', 'lower', 'same_x1'], '#higher-or-lower', [redOrBlackCard.card.value])
        }
        return nextAction('redOrBlack')

      case 'higher':
      case 'lower':
      case 'same_x1':
        if (redOrBlack.state.length && higherOrLower.state.length && !insideOrOutside.state.length) {
          redOrBlackCard = redOrBlack.state[redOrBlack.state.length - 1]
          higherOrLowerCard = higherOrLower.state[higherOrLower.state.length - 1]

          if (DEBUG > 1 || (
            (
              action === 'higher' && (
                higherOrLowerCard.card.value > redOrBlackCard.card.value
              )
            ) || (
              action === 'lower' && (
                higherOrLowerCard.card.value < redOrBlackCard.card.value
              )
            ) || (
              action === 'same_x1' && (
                higherOrLowerCard.card.value === redOrBlackCard.card.value
              )
            )
          )) {
            return nextAction('insideOrOutside')
          }
        }
        return nextAction('redOrBlack')

      case 'insideOrOutside':
        if (redOrBlack.state.length && higherOrLower.state.length && !insideOrOutside.state.length) {
          redOrBlackCard = redOrBlack.state[redOrBlack.state.length - 1]
          higherOrLowerCard = higherOrLower.state[higherOrLower.state.length - 1]

          higherOrLower.render()

          insideOrOutside.state.push(takeCard())
          insideOrOutside.render()

          return toggleButtons(['inside', 'outside', 'same_x2'], '#inside-or-outside', [redOrBlackCard.card.value, higherOrLowerCard.card.value])
        }
        return nextAction('redOrBlack')

      case 'inside':
      case 'outside':
      case 'same_x2':
        if (redOrBlack.state.length && higherOrLower.state.length && insideOrOutside.state.length) {
          redOrBlackCard = redOrBlack.state[redOrBlack.state.length - 1]
          higherOrLowerCard = higherOrLower.state[higherOrLower.state.length - 1]
          insideOrOutsideCard = insideOrOutside.state[insideOrOutside.state.length - 1]

          const higherCard = redOrBlackCard.card.value > higherOrLowerCard.card.value ? redOrBlackCard : higherOrLowerCard
          const lowerCard = redOrBlackCard.card.value > higherOrLowerCard.card.value ? higherOrLowerCard : redOrBlackCard

          if (DEBUG > 1 || (
            (
              action === 'inside' && (
                insideOrOutsideCard.card.value > lowerCard.card.value
                && insideOrOutsideCard.card.value < higherCard.card.value
              )
            ) || (
              action === 'outside' && (
                insideOrOutsideCard.card.value < lowerCard.card.value
                || insideOrOutsideCard.card.value > higherCard.card.value
              )
            ) || (
              action === 'same_x2' && (
                insideOrOutsideCard.card.value === lowerCard.card.value
                || insideOrOutsideCard.card.value === higherCard.card.value
              )
            )
          )) {
            return nextAction('ongoing') // @NOTE Shows finish_turn button; probably could have a better name.
          }
        }
        return nextAction('redOrBlack')

      case 'ongoing':
        if (redOrBlack.state.length && higherOrLower.state.length && insideOrOutside.state.length) {
          redOrBlackCard = redOrBlack.state[redOrBlack.state.length - 1]
          higherOrLowerCard = higherOrLower.state[higherOrLower.state.length - 1]
          insideOrOutsideCard = insideOrOutside.state[insideOrOutside.state.length - 1]

          insideOrOutside.render()

          return toggleButtons(['finish_turn'], '#ongoing', [
            // redOrBlackCard,
            // higherOrLowerCard,
            // insideOrOutsideCard
          ])
        }
        return nextAction('redOrBlack')

      case 'finish_turn':
        if (redOrBlack.state.length && higherOrLower.state.length && insideOrOutside.state.length) {
          nextAction('redOrBlack', true)
        }
        return nextAction('redOrBlack')
    }
  }

  let lastClick
  $('button').click((e) => {
    if (lastClick && Date.now() - lastClick < CLICK_DELAY) {
      return
    }
    lastClick = Date.now()

    const action = $(e.target).data('locale-key')
    nextAction(action)
  })
})
