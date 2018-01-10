

const tools = {
  state: {
  },
  mutations: {
  },
  actions: {
    /*
    时间过滤；
    */
    FilterDate({ commit },  date){
        if (!date) {
            return ;
        }
        date = new Date(Number(date))
        let y = date.getFullYear()
        let m = date.getMonth()
        let d = date.getDate();
        m = m >= 10 ? m : `0${m}`;
        d = d >= 10 ? d : `0${d}`;
        return `${y}-${m}-${d}`;
    }
   },
};

export default tools;
