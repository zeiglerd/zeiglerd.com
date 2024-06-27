const cheddar = {
  ...window.cheddar ?? {}
}

cheddar.localeMap = {
}

cheddar.getLocaleKey = (substr) => window.i18n.getLocaleKey(substr)
cheddar.getLocale = (localeKey) => window.i18n.getLocale('cheddar', localeKey)
cheddar.expandLocale = (locale, overrides = []) => window.i18n.expandLocale('cheddar', locale, overrides)

window.cheddar = cheddar

$(() => {

  $('[data-locale-key]').each((index, element) => {
    const key = $(element).data('locale-key')
    $(element).html(cheddar.getLocale(key))
  })

  $('[data-before-key]').each((index, element) => {
    const key = $(element).data('before-key')
    $(element).attr('style', `--before-string: '${cheddar.getLocale(key)}'`)
  })

})
