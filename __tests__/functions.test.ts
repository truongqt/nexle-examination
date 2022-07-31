import {colors} from 'assets';
import {checkPasswordStrength, checkValidEmail} from 'utils/helpers/functions';

test('checkPasswordStrength', () => {
  const strong = 'User123@';
  const good = 'User123';
  const fair = 'Userabcd';
  const weak = 'abcdef';
  const nullPassword = '';
  const short = 'abc';

  expect(checkPasswordStrength(strong)).toEqual({
    strength: 'Strong',
    color: colors.error.strong,
    barWidth: '100%',
  });

  expect(checkPasswordStrength(good)).toEqual({
    strength: 'Good',
    color: colors.error.good,
    barWidth: '75%',
  });

  expect(checkPasswordStrength(fair)).toEqual({
    strength: 'Fair',
    color: colors.error.fair,
    barWidth: '50%',
  });

  expect(checkPasswordStrength(weak)).toEqual({
    strength: 'Weak',
    color: colors.error.week,
    barWidth: '25%',
  });

  expect(checkPasswordStrength(nullPassword)).toEqual({
    strength: '',
    color: colors.error.good,
    barWidth: '100%',
  });

  expect(checkPasswordStrength(short)).toEqual({
    strength: 'Short',
    color: colors.error.short,
    barWidth: '0%',
  });
});


test('checkValidEmail', ()=> {
    const email1 = '';
    const email2 = 'user';
    const email3 = 'user@';
    const email4 = 'user@gmail.';
    const email5 = 'user@gmail.com';

    expect(checkValidEmail(email1)).toEqual('Invalid email');

    expect(checkValidEmail(email2)).toEqual('Invalid email');

    expect(checkValidEmail(email3)).toEqual('Invalid email');

    expect(checkValidEmail(email4)).toEqual('Invalid email');

    expect(checkValidEmail(email5)).toEqual('');
})