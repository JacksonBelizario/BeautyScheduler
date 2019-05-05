import axios from 'axios';

export const consultarCEP = async cep => {
    const cepNum = cep ? cep.match(/\d+/gi).join("") : "";
    if (cepNum.length !== 8) return;
    try {
      const {data} = await axios.get(`//viacep.com.br/ws/${cepNum}/json/`);
      return !data.erro ? data : { cep };
    } catch (err) {
      return { cep };
    }
};