export async function sendOTP({email, username, password}:{email: string, username: string, password: string}) {
     try {
      await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          username,
          password
        }),
      })
    } catch (e) {
      console.error("OTP send failed", e)
    }
}
    
export async function verifyOTP({username, otp}:{username: string, otp: string}) {
    if (!otp) return

    try{      
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          otp,
        }),
      })

      if(res.ok){
        return true;
      }
      return false
    }catch(e){
      return false;
    }
  }
