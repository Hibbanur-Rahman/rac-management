import Request from "@/config/apiConfig"
import apiUrls from "@/config/apiUrls"

const GetAllSupervisor=async()=>Request({
    method:"GET",
    url:`${apiUrls.supervisor}`,
    secure:true
});

const GetCoordinator=async()=>Request({
    method:"GET",
    url:`coordinator`,
    secure:true
})

const SupervisorService={
    GetAllSupervisor,
    GetCoordinator
}

export default SupervisorService;