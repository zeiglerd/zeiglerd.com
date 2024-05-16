const DEBUG = 0
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
              color: window.geordie.getLocale(suit.colorKey),
              suitKey: window.geordie.getLocaleKey(suit.suitKey),
              suit: window.geordie.getLocale(suit.suitKey)
            }
          })
        })
      })

      deck.state = shuffle ? shuffleArray(deck.state) : deck.state
    },
    render: () => {
      if (deck.state && deck.state.length) {
        $deckCard.find('img').attr('src', `${cardPath}/backs/astronaut.svg`);
      } else {
        $deckCard.find('img').attr('src', `${cardPath}/other/blank_card_no_fill.svg`);
      }
    }
  }

  const discard = {
    state: [],
    render: () => {
      if (discard.state && discard.state.length) {
        const lastCard = discard.state[discard.state.length - 1]
        $discardCard.find('img')
          .attr('src', `${cardPath}/fronts/${lastCard.suit.suitKey}_${lastCard.card.key}.svg`);
      } else {
        $discardCard.find('img').attr('src', `${cardPath}/other/blank_card_no_fill.svg`);
      }
    }
  }

  const ongoing = {
    state: [],
    render: () => {
      if (ongoing.state && ongoing.state.length) {
        const lastCard = ongoing.state[ongoing.state.length - 1]
        $ongoingCard.find('img')
          .attr('src', `${cardPath}/fronts/${lastCard.suit.suitKey}_${lastCard.card.key}.svg`);
      } else {
        $ongoingCard.find('img').attr('src', `${cardPath}/other/blank_card_no_fill.svg`);
      }
    }
  }

  const redOrBlack = {
    state: [],
    render: () => {
      if (redOrBlack.state && redOrBlack.state.length) {
        const lastCard = redOrBlack.state[redOrBlack.state.length - 1]
        $redOrBlackCard.find('img')
          .attr('src', `${cardPath}/fronts/${lastCard.suit.suitKey}_${lastCard.card.key}.svg`);
      } else {
        $redOrBlackCard.find('img').attr('src', `${cardPath}/other/blank_card_no_fill.svg`);
      }
    }
  }

  const higherOrLower = {
    state: [],
    render: () => {
      if (higherOrLower.state && higherOrLower.state.length) {
        const lastCard = higherOrLower.state[higherOrLower.state.length - 1]
        $higherOrLowerCard.find('img')
          .attr('src', `${cardPath}/fronts/${lastCard.suit.suitKey}_${lastCard.card.key}.svg`);
      } else {
        $higherOrLowerCard.find('img').attr('src', `${cardPath}/other/blank_card_no_fill.svg`);
      }
    }
  }

  const insideOrOutside = {
    state: [],
    render: () => {
      if (insideOrOutside.state && insideOrOutside.state.length) {
        const lastCard = insideOrOutside.state[insideOrOutside.state.length - 1]
        $insideOrOutsideCard.find('img')
          .attr('src', `${cardPath}/fronts/${lastCard.suit.suitKey}_${lastCard.card.key}.svg`);
      } else {
        $insideOrOutsideCard.find('img').attr('src', `${cardPath}/other/blank_card_no_fill.svg`);
      }
    }
  }

  let lastButtons
  let lastScrollIntoView
  const toggleButtons = (buttons, scrollIntoView) => {
    const selector = buttons.map((button) => `[data-locale-key=${button}]`).join(',')

    $('button').prop('disabled', true)

    if (deck.state.length) {
      $(selector).prop('disabled', false)

      $(scrollIntoView)[0].scrollIntoView()
    } else {
      lastButtons = buttons
      lastScrollIntoView = scrollIntoView

      $('[data-locale-key=shuffle_deck]').prop('disabled', false)

      $('#discard')[0].scrollIntoView()
    }
  }

  const takeCard = () => {
    const card = deck.state.pop()
    deck.render()
    return card
  }

  const cleanUp = (doDiscard) => {
    to = doDiscard ? discard : ongoing

    if (doDiscard) {
      ongoing.state.forEach((each) => {
        to.state.push(each)
      })
      ongoing.state = []
      ongoing.render()
    }

    if (redOrBlack.state.length) {
      redOrBlack.state.forEach((each) => {
        to.state.push(each)
      })
      redOrBlack.state = []
      redOrBlack.render()
    }

    if (higherOrLower.state.length) {
      higherOrLower.state.forEach((each) => {
        to.state.push(each)
      })
      higherOrLower.state = []
      higherOrLower.render()
    }

    if (insideOrOutside.state.length) {
      insideOrOutside.state.forEach((each) => {
        to.state.push(each)
      })
      insideOrOutside.state = []
      insideOrOutside.render()
    }

    to.render()
  }

  const nextStep = (step, doDiscard) => {
    switch(step) {
      case 'redOrBlack':
        cleanUp(doDiscard)

        redOrBlack.state.push(takeCard())
        redOrBlack.render()

        toggleButtons(['red', 'black'], '#red-or-black')
        break

      case 'higherOrLower':
        higherOrLower.state.push(takeCard())
        higherOrLower.render()

        toggleButtons(['higher', 'lower', 'same_x1'], '#higher-or-lower')
        break

      case 'insideOrOutside':
        insideOrOutside.state.push(takeCard())
        insideOrOutside.render()

        toggleButtons(['inside', 'outside', 'same_x2'], '#inside-or-outside')
        break

      case 'ongoing':
        toggleButtons(['finish_turn'], '#ongoing')
        break
    }
  }

  let lastClick
  $('button').click((e) => {
    if (lastClick && Date.now() - lastClick < CLICK_DELAY) {
      return
    }
    lastClick = Date.now()

    let redBlackCard
    let higherOrLowerCard
    let insideOrOutsideCard

    const action = $(e.target).data('locale-key')

    switch(action) {
      case 'start_game':
        if (!deck.state) {
          deck.deal(true)

          nextStep('redOrBlack')
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

          toggleButtons(lastButtons, lastScrollIntoView)
        }
        break

      case 'red':
      case 'black':
        if (redOrBlack.state.length && !higherOrLower.state.length && !insideOrOutside.state.length) {
          redBlackCard = redOrBlack.state[redOrBlack.state.length - 1]

          if ((DEBUG > 1) || (
            action === redBlackCard.suit.colorKey
          )) {
            nextStep('higherOrLower')
          } else {
            nextStep('redOrBlack')
          }
        }
        break

      case 'higher':
      case 'lower':
      case 'same_x1':
        if (redOrBlack.state.length && higherOrLower.state.length && !insideOrOutside.state.length) {
          redBlackCard = redOrBlack.state[redOrBlack.state.length - 1]
          higherOrLowerCard = higherOrLower.state[higherOrLower.state.length - 1]

          if ((DEBUG > 1) || (
            (
              action === 'higher' && (
                higherOrLowerCard.card.value > redBlackCard.card.value
              )
            ) || (
              action === 'lower' && (
                higherOrLowerCard.card.value < redBlackCard.card.value
              )
            ) || (
              action === 'same_x1' && (
                higherOrLowerCard.card.value === redBlackCard.card.value
              )
            )
          )) {
            nextStep('insideOrOutside')
          } else {
            nextStep('redOrBlack')
          }
        }
        break

      case 'inside':
      case 'outside':
      case 'same_x2':
        if (redOrBlack.state.length && higherOrLower.state.length && insideOrOutside.state.length) {
          redBlackCard = redOrBlack.state[redOrBlack.state.length - 1]
          higherOrLowerCard = higherOrLower.state[higherOrLower.state.length - 1]
          insideOrOutsideCard = insideOrOutside.state[insideOrOutside.state.length - 1]

          const higherCard = redBlackCard.card.value > higherOrLowerCard.card.value ? redBlackCard : higherOrLowerCard
          const lowerCard = redBlackCard.card.value > higherOrLowerCard.card.value ? higherOrLowerCard : redBlackCard

          if ((DEBUG > 1) || (
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
            nextStep('ongoing') // @NOTE Shows finish_turn button.
          } else {
            nextStep('redOrBlack')
          }
        }
        break

      case 'finish_turn':
        if (redOrBlack.state.length && higherOrLower.state.length && insideOrOutside.state.length) {
          nextStep('redOrBlack', true)
        }
        break
    }
  })
})
