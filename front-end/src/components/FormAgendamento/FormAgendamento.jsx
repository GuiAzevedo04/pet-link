import React, { useState } from 'react';
import './FormAgendamento.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import axios from 'axios';


const FormAgendamento = () => {
  const initialAgendamento = {
    scheduleDate: "",
    petName: "",
    timeOfSchedule: "",
    status: "Pending",
    serviceId: '',
    description: ''
  };
  const [selectedDate, setSelectedDate] = useState(null);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [agendamento, setAgendamento] = useState(initialAgendamento)

  // Função para desabilitar datas fora do intervalo permitido
  const shouldDisableDate = (date) => {
    const today = dayjs(); // Data atual
    const maxDate = today.add(14, 'day'); // Data limite (2 semanas a partir de hoje)
    return date.isBefore(today, 'day') || date.isAfter(maxDate, 'day');
  };

  const fetchDay = async (day) =>{
    setSelectedDate(day);
    try{
      const formattedDate = dayjs(day).format('YYYY-MM-DD');
      console.log("tipo de data", formattedDate)
      setAgendamento(prevData => ({
        ...prevData,
        scheduleDate: formattedDate, // Atualiza a data no estado do formulário
      }));

      const response = await axios.get(`/api/agendamentos/horarios-disponiveis?date=${formattedDate}`, {
        headers: {
          "skip_zrok_interstitial": "true",
        },
      });
      console.log("horarios disponiveis:", response.data);
      setHorariosDisponiveis(response.data.avaliableTimes)
    } catch (err) {
      console.error("Erro ao solicitar horários disponíveis", err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgendamento({
      ...agendamento,
      [name]: value,
    });
  };

  const getToken = () => {
    return localStorage.getItem('authToken');
  }
  const handlesubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    try{
      const response = await axios.post('/api/agendamentos', agendamento, {
        headers: {
          "skip_zrok_interstitial": "true",
          "Authorization": `Bearer ${token}`,
        },
      });
      setAgendamento(initialAgendamento);
      setSelectedDate(null); // Reset the selected date
      setHorariosDisponiveis([]); // Clear available times
    } catch (err){
      console.error("Erro ao enviar formulario:", err)
    }
  }

  return (
    <div className='agendamento'>
      <form action="" className='form-agendamento' onSubmit={handlesubmit}>
        <label htmlFor="petName">Nome do seu amiguinho:</label>
        <input type="text" name='petName' value={agendamento.petName} onChange={handleChange} className='input-text-form' />

        <label htmlFor="scheduleDate">Escolha a data:</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            name="datateste"
            value={selectedDate}
            onChange={(newValue) => fetchDay(newValue)}
            shouldDisableDate={shouldDisableDate} 
            inputFormat="DD/MM/YYYY"
            renderInput={(params) => <input {...params} className="input-text-form" />}
          />
        </LocalizationProvider>

        <label htmlFor="horarioAgendamento">Escolha um dos horários disponíveis:</label>
        <select name="timeOfSchedule" value={agendamento.timeOfSchedule} onChange={handleChange}>
          {horariosDisponiveis.length === 0 ? (
            <option>Nenhum horário disponível</option>
          ) : (
            horariosDisponiveis.map((horario, index) => (
              <option key={index} value={horario}>{horario}</option>
            ))
          )}
        </select>

        <label htmlFor="description">Alguma observação:</label>
        <textarea name='description' value={agendamento.description} onChange={handleChange} className='textarea-form' />

        <div className="checkbox-group">
          <label>
            <input type="radio" name="serviceId" value="1" checked={agendamento.serviceId === "1"} onChange={handleChange} />
            Banho e Tosa (R$ 50.00)
          </label>
          <label>
            <input type="radio" name="serviceId" value="2" checked={agendamento.serviceId === "2"} onChange={handleChange} />
            Banho (R$ 30.00)
          </label>
          <label>
            <input type="radio" name="serviceId" value="3" checked={agendamento.serviceId === "3"} onChange={handleChange} />
            Tosa (R$ 30.00)
          </label>
        </div>
        <button type='submit' data-cy="agendar">Agendar</button>
      </form>
    </div>
  );
}

export default FormAgendamento;
