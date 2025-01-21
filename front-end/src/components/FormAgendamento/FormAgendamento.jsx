import React, { useState } from 'react';
import './FormAgendamento.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const FormAgendamento = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Função para desabilitar datas fora do intervalo permitido
  const shouldDisableDate = (date) => {
    const today = dayjs(); // Data atual
    const maxDate = today.add(14, 'day'); // Data limite (2 semanas a partir de hoje)
    return date.isBefore(today, 'day') || date.isAfter(maxDate, 'day');
  };

  return (
    <div className='agendamento'>
      <form action="" className='form-agendamento'>
        <label htmlFor="nomePet">Nome do seu amiguinho:</label>
        <input type="text" name='nomePet' className='input-text-form' />

        <label htmlFor="racaPet">Raça do seu pet:</label>
        <input type="text" name='racaPet' className='input-text-form' />

        <label htmlFor="diaAgendamento">Escolha a data:</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            shouldDisableDate={shouldDisableDate} // Adiciona a lógica de desabilitação
            renderInput={(params) => <input {...params} className="input-text-form" />}
          />
        </LocalizationProvider>

        <label htmlFor="horarioAgendamento">Escolha um dos horários disponíveis:</label>
        <select name="horarioAgendamento">
          <option value="">opção 1</option>
          <option value="">opção 2</option>
        </select>

        <label htmlFor="observacaoAgendamento">Alguma observação:</label>
        <textarea name='observacaoAgendamento' className='textarea-form' />

        <div className="checkbox-group">
          <label>
            <input type="radio" name="servico" value="BanhoTosa" />
            Banho e Tosa
          </label>
          <label>
            <input type="radio" name="servico" value="Banho" />
            Banho
          </label>
          <label>
            <input type="radio" name="servico" value="Tosa" />
            Tosa
          </label>
        </div>
        <button type='submit'>Agendar</button>
      </form>
    </div>
  );
}

export default FormAgendamento;
