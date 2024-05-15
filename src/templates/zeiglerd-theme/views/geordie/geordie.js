const DEBUG = 0

const cardPath = '/images/templates/zeiglerd-theme/views/geordie'

$(() => {
  const $deckContainer = $('#deck').find('.card-slot')
  const $discardContainer = $('#discard').find('.card-slot')
  const $ongoingContainer = $('#ongoing').find('.card-slot')
  const $redOrBlackContainer = $('#red-or-black').find('.card-slot')
  const $higherOrLowerContainer = $('#higher-or-lower').find('.card-slot')
  const $insideOrOutsideContainer = $('#inside-or-outside').find('.card-slot')

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

  const deck = {
    state: undefined,
    deal: (shuffle) => {
      deck.state = []

      window.geordie.localeMap.suits.forEach((suit) => {
        window.geordie.localeMap.cards.forEach((card) => {
          const $card = $(`<div class="card" />`)
          $card.attr('data-deck-id', deck.state.length)
          $card.attr('style', `--background-url: url(${cardPath}/backs/astronaut.svg)`)

          card = {
            value: card.value,
            key: window.geordie.getLocaleKey(card.key),
          }

          suit = {
            colorKey: window.geordie.getLocaleKey(suit.colorKey),
            color: window.geordie.getLocale(suit.colorKey),
            suitKey: window.geordie.getLocaleKey(suit.suitKey),
            suit: window.geordie.getLocale(suit.suitKey)
          }

          if (DEBUG) {
            $card.attr('style', `--background-url: url(${cardPath}/fronts/${suit.suitKey}_${card.key}.svg)`)
          }

          deck.state.push({ $card, card, suit })
        })
      })

      deck.state = shuffle
        ? shuffleArray(deck.state)
        : deck.state
    },
    render: () => {
      $deckContainer.empty()
      deck.state.forEach((card) => {
        card.$card.fadeIn(128)
        $deckContainer.append(card.$card)
      })
    }
  }

  const discard = {
    state: [],
    render: () => {
      $discardContainer.empty()
      discard.state.forEach((card) => {
        card.$card.fadeIn(128)
        $discardContainer.append(card.$card)
      })
    }
  }

  const ongoing = {
    state: [],
    render: () => {
      $ongoingContainer.empty()
      ongoing.state.forEach((card) => {
        card.$card.fadeIn(128)
        $ongoingContainer.append(card.$card)
      })
    }
  }

  const redOrBlack = {
    state: [],
    render: () => {
      $redOrBlackContainer.empty()
      redOrBlack.state.forEach((card) => {
        card.$card.fadeIn(128)
        $redOrBlackContainer.append(card.$card)
      })
    }
  }

  const higherOrLower = {
    state: [],
    render: () => {
      $higherOrLowerContainer.empty()
      higherOrLower.state.forEach((card) => {
        card.$card.fadeIn(128)
        $higherOrLowerContainer.append(card.$card)
      })
    }
  }

  const insideOrOutside = {
    state: [],
    render: () => {
      $insideOrOutsideContainer.empty()
      insideOrOutside.state.forEach((card) => {
        card.$card.fadeIn(128)
        $insideOrOutsideContainer.append(card.$card)
      })
    }
  }

  let $lastButtons
  let $lastScrollIntoView
  const toggleButtons = (buttons, scrollIntoView) => {
    const selector = buttons.map((button) => `[data-locale-key=${button}]`).join(',')

    $('button').prop('disabled', true)

    if (deck.state.length) {
      $(selector).prop('disabled', false)

      scrollIntoView.scrollIntoView()
    } else {
      $lastButtons = buttons
      $lastScrollIntoView = scrollIntoView

      $('[data-locale-key=shuffle_deck]').prop('disabled', false)

      $discardContainer.scrollIntoView()
    }
  }

  const takeCard = () => {
    const card = deck.state.pop()
    card.$card.attr('style', `--background-url: url(${cardPath}/fronts/${card.suit.suitKey}_${card.card.key}.svg)`)
    return card
  }

  const startTurn = (turn, doDiscard) => {
    switch(turn) {
      case 'redOrBlack':
        if (redOrBlack.state.length) {
          redOrBlack.state.forEach((each) => {
            ongoing.state.push(each)
          })
          redOrBlack.state = []
        }
        if (higherOrLower.state.length) {
          higherOrLower.state.forEach((each) => {
            ongoing.state.push(each)
          })
          higherOrLower.state = []
          higherOrLower.render()
        }
        if (insideOrOutside.state.length) {
          insideOrOutside.state.forEach((each) => {
            ongoing.state.push(each)
          })
          insideOrOutside.state = []
          insideOrOutside.render()
        }
        if (doDiscard) {
          ongoing.state.forEach((each) => {
            discard.state.push(each)
          })
          ongoing.state = []
          discard.render()
        }
        ongoing.render()

        redOrBlack.state.push(takeCard())
        redOrBlack.render()
        deck.render()

        toggleButtons(['red', 'black'], $redOrBlackContainer[0])
        break

      case 'higherOrLower':
        higherOrLower.state.push(takeCard())
        higherOrLower.render()
        deck.render()

        toggleButtons(['higher', 'lower', 'same_x1'], $higherOrLowerContainer[0])
        break

      case 'insideOrOutside':
        insideOrOutside.state.push(takeCard())
        insideOrOutside.render()
        deck.render()

        toggleButtons(['inside', 'outside', 'same_x2'], $insideOrOutsideContainer[0])
        break

      case 'ongoing':
        toggleButtons(['finish_turn'], $ongoingContainer[0])
        break
    }
  }

  let lastClick
  $('button').click((e) => {
    if (lastClick && Date.now() - lastClick < 350) {
      return
    }
    lastClick = Date.now()

    let redBlackCard
    let higherLowerCard
    let insideOutsideCard
    let higherCard
    let lowerCard

    const actionKey = $(e.target).data('locale-key')

    switch(actionKey) {
      case 'start_game':
        if (!deck.state) {
          deck.deal(true)

          startTurn('redOrBlack')
        }
        break

      case 'shuffle_deck':
        if (!deck.state.length) {
          discard.state.forEach((each) => {
            deck.state.push(each)
          })
          discard.state = []
          discard.render()

          deck.state = shuffleArray(deck.state)
          deck.render()

          toggleButtons($lastButtons, $lastScrollIntoView)
        }
        break

      case 'red':
      case 'black':
        if (redOrBlack.state.length && !higherOrLower.state.length && !insideOrOutside.state.length) {
          redBlackCard = redOrBlack.state[redOrBlack.state.length - 1]

          if ((DEBUG > 1) || (
            actionKey === redBlackCard.suit.colorKey
          )) {
            startTurn('higherOrLower')
          } else {
            startTurn('redOrBlack')
          }
        }
        break

      case 'higher':
      case 'lower':
      case 'same_x1':
        if (redOrBlack.state.length && higherOrLower.state.length && !insideOrOutside.state.length) {
          redBlackCard = redOrBlack.state[redOrBlack.state.length - 1]
          higherLowerCard = higherOrLower.state[higherOrLower.state.length - 1]

          if ((DEBUG > 1) || (
            (
              actionKey === 'higher' && (
                higherLowerCard.card.value > redBlackCard.card.value
              )
            ) || (
              actionKey === 'lower' && (
                higherLowerCard.card.value < redBlackCard.card.value
              )
            ) || (
              actionKey === 'same_x1' && (
                higherLowerCard.card.value === redBlackCard.card.value
              )
            )
          )) {
            startTurn('insideOrOutside')
          } else {
            startTurn('redOrBlack')
          }
        }
        break

      case 'inside':
      case 'outside':
      case 'same_x2':
        if (redOrBlack.state.length && higherOrLower.state.length && insideOrOutside.state.length) {
          redBlackCard = redOrBlack.state[redOrBlack.state.length - 1]
          higherLowerCard = higherOrLower.state[higherOrLower.state.length - 1]
          insideOutsideCard = insideOrOutside.state[insideOrOutside.state.length - 1]

          higherCard = redBlackCard.card.value > higherLowerCard.card.value ? redBlackCard : higherLowerCard
          lowerCard = redBlackCard.card.value > higherLowerCard.card.value ? higherLowerCard : redBlackCard

          if ((DEBUG > 1) || (
            (
              actionKey === 'inside' && (
                insideOutsideCard.card.value > lowerCard.card.value
                && insideOutsideCard.card.value < higherCard.card.value
              )
            ) || (
              actionKey === 'outside' && (
                insideOutsideCard.card.value < lowerCard.card.value
                || insideOutsideCard.card.value > higherCard.card.value
              )
            ) || (
              actionKey === 'same_x2' && (
                insideOutsideCard.card.value === lowerCard.card.value
                || insideOutsideCard.card.value === higherCard.card.value
              )
            )
          )) {
            startTurn('ongoing')
          } else {
            startTurn('redOrBlack')
          }
        }
        break

      case 'finish_turn':
        if (redOrBlack.state.length && higherOrLower.state.length && insideOrOutside.state.length) {
          startTurn('redOrBlack', true)
        }
        break
    }
  })
})
